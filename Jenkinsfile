pipeline {
    agent any  // This will run the pipeline on any available agent

    tools {
        nodejs("nodejs")
        ansible("ansible-latest") 
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
                        inventoryFile = 'inventories/prod_hosts'  // Prod environment
                    } else if (branchName == 'origin/develop') {
                        inventoryFile = 'inventories/dev_hosts'   // Dev environment
                    } else {
                        error "Unknown branch '${branchName}', deployment aborted."
                    }

                    ansiblePlaybook(
                    playbook: 'playbooks/main.yml',  // Path to your playbook
                    inventory: inventoryFile, // Path to your inventory file (set dynamically)
                    sudo: true
                    )
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
