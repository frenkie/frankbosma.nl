import { gql } from '@apollo/client';
import  client from '../../includes/libs/graphql';

export default (req, res) => {

    return new Promise( (resolve, reject) => {
        client
            .query( {
                query: gql`
                query {
                  intro{
                    description
                    title,
                  },
                  contact {
                    description
                  },
                  developer {
                    text,
                    projects {
                      ... on ComponentRelatedProject {
                        project {
                          id,
                          hyperlink,
                          hyperlink_label,
                          period,
                          summary,
                          shoutout,
                          title,
                          type,
                          images {
                            image {
                              ext,
                              formats,
                              hash,
                              height
                              width,
                            }
                          },
                          tags {
                            id,
                            name
                          }
                        }
                      }
                    }
                  }
                }
    `
            } )
            .then(
                result => {

                    if ( result && result.data ) {
                        res.statusCode = 200;
                        res.json( result.data );
                    } else {
                        res.statusCode = 401;
                        res.json( {} );
                    }
                    resolve();

                }, err => {
                    console.log( err );
                    res.statusCode = 500;
                    res.json( {} );
                    resolve();
                } );
    });
}
