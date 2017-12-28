# Use java 8 base
FROM java:8

# Update the kernel and install maven
RUN apt-get update
RUN apt-get install -yqq maven

# Create/set the microservice directory
RUN mkdir -p /usr/jukebox/yoda
WORKDIR /usr/jukebox/yoda

# Copy necessary source code and config files
COPY pom.xml /usr/jukebox/yoda
COPY src /usr/jukebox/yoda/src

# Build/verify mvn project
RUN ["mvn", "dependency:resolve"]
RUN ["mvn", "verify"]
RUN ["mvn", "package"]

# Add an ENTRYPOINT to the service
ENTRYPOINT ["java", "-cp", "target/yoda-0.1-SNAPSHOT.jar", "life.jukebox.App"]
