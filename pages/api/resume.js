import { gql } from '@apollo/client';
import  client from '../../includes/libs/graphql';

export default (req, res) => {

    return new Promise( (resolve, reject) => {
        client
            .query( {
                query: gql`
                query {
                  resume {
                    about_me,
                    full_name,
                    email,
                    birth_date,
                    phone,
                    profile {
                      ext,
                      formats,
                      hash,
                      height
                      width,
                    },                    
                    role,
                    skills,
                    social {
                      label,
                      hyperlink
                    },                     
                    education {
                      period,
                      title,
                      school,
                    },                   
                    experience {
                      ... on ComponentRelatedProject {
                        project {
                          id,
                          hyperlink,
                          hyperlink_label,
                          period,
                          resume,
                          shoutout,
                          title,
                          job,
                          tags {
                            id,
                            name
                          },
                          cv_page_break
                        }
                      }
                    },
                    spare_time
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
