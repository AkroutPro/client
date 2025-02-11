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

                sh """
                cd /tmp/ansible-client
                git checkout main
                git pull origin main
                ansible-playbook playbooks/main.yml -i inventories/dev_hosts.ini \
                --extra-vars "artifact_url=https://1a80-109-29-31-197.ngrok-free.app/job/develop/lastBuild/artifact/build/*zip*/build.zip
                 jenkins_user=akrout jenkins_token=113a11226779c9e2b7b0c4624f2894155b"

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

