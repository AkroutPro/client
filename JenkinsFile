pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Git branch to build')
    }

    environment {
        NODE_HOME = tool name: 'nodejs', type: 'NodeJS'  // Ensure that Node.js is installed in Jenkins
        PATH = "${NODE_HOME}/bin:${env.PATH}"          // Add Node.js to PATH
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub with the specified branch
                git branch: "${params.BRANCH_NAME}", url: 'git@github.com:yourusername/your-repository.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies using npm
                    sh 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    // Build the React app
                    sh 'npm run build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run tests (make sure to have a testing framework, e.g., Jest)
                    sh 'npm test -- --watchAll=false'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deployment script - this can vary depending on your environment
                    // Example: deploy to a server or push to Docker
                    sh './deploy.sh'
                }
            }
        }
    }

    post {
        always {
            // Clean up actions if needed (e.g., clean workspace)
            cleanWs()
        }

        success {
            // Actions to take if the pipeline succeeds
            echo 'Build and deployment successful!'
        }

        failure {
            // Actions to take if the pipeline fails
            echo 'Build or deployment failed.'
        }
    }
}
