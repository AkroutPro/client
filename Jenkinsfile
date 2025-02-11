pipeline {
    agent any  // This will run the pipeline on any available agent

    tools {
        nodejs("nodejs")
    }
    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'npm test -- --watchAll=false'
                }
            }
        }

        stage('Archive Build Artifact') {
            steps {
                archiveArtifacts allowEmptyArchive: true, artifacts: 'build/**/*', followSymlinks: false
            }
        }
        
        stage('Clone Ansible Repo') {
            steps {
                script {
                    sh 'rm -rf /tmp/ansible-client'
                    // Clone the Ansible repository
                    // Use your own Git URL and credentials if required
                    sh 'git clone git@github.com:AkroutPro/ansible-client.git /tmp/ansible-client'
                     
                }
            }
        }
        stage('Deploy with Ansible') {
            steps {
                
                script {
                    // Get the current branch name
                    // Get the branch name from the Jenkins job environment
                    def branchName = env.GIT_BRANCH
                    echo "Current branch: ${branchName}"
                    def inventoryFile

                    // Determine the environment based on the branch name
                    if (branchName == 'origin/main') {
                        inventoryFile = 'inventories/prod_hosts.ini'  // Prod environment
                    } else if (branchName == 'origin/develop') {
                        inventoryFile = 'inventories/dev_hosts.ini'   // Dev environment
                    } else {
                        error "Unknown branch '${branchName}', deployment aborted."
                    }
                def ARTIFACT_URL= "https://1a80-109-29-31-197.ngrok-free.app/job/develop/lastBuild/artifact/build/"
                                         // Ensure we are on the 'main' branch

                sh """
                cd /tmp/ansible-client
                git checkout main
                git pull origin main
                ansible-playbook playbooks/main.yml -i ${inventoryFile} --extra-vars artifact_url=${ARTIFACT_URL} jenkins_user=akrout jenkins_token=113a11226779c9e2b7b0c4624f2894155b"
                """
                    
            
                     }
            }
        }
    
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }

        failure {
            echo 'Build or deployment failed.'
        }
    }
}

