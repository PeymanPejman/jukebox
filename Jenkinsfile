node {
  def project = 'REPLACE_WITH_YOUR_PROJECT_ID'
  def author = 'pedrampejman'
  def appName = 'jb-app'
  def imageTag = "${author}/${appName}:latest"

  checkout scm

  stage 'Build image'
  sh("docker login -u pedrampejman -p Peji20??d")
  sh("docker build -t ${imageTag} ./app/")

  stage 'Push image to registry'
  sh("docker push ${imageTag}")

  stage "Deploy Application"
  switch (env.BRANCH_NAME) {

    // Roll out to production
    case "master":
        sh("kubectl apply -f k8/app/service-jb-app.yaml")
        sh("kubectl apply -f k8/app/jb-app.yaml")
        break
  }
}
