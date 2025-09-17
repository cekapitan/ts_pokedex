# ts_pokedex

A TypeScript Pokédex application with REPL interface.

## Development Setup

### Prerequisites

- Node.js (see `.nvmrc` for version)
- Conda (Miniconda or Anaconda)

### 1. Conda Environment Setup

Create and activate a conda environment for Java development:

```bash
# Create a new conda environment
conda create -n java-dev python=3.9

# Activate the environment
conda activate java-dev
```

### 2. Install OpenJDK

Install OpenJDK using conda:

```bash
# Install OpenJDK 11 (recommended for Spring Boot)
conda install openjdk=11

# Verify installation
java -version
javac -version
```

Alternative versions:
```bash
# For OpenJDK 8
conda install openjdk=8

# For OpenJDK 17 (latest LTS)
conda install openjdk=17

# For Oracle JDK
conda install oracle-jdk
```

### 3. Spring Boot Project Setup

#### Create Spring Boot Project

```bash
# Using Spring Initializr
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa,h2 \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.2.0 \
  -d baseDir=spring-boot-app \
  -d groupId=com.example \
  -d artifactId=demo \
  -d name=demo \
  -d description="Demo project for Spring Boot" \
  -d packageName=com.example.demo \
  -d packaging=jar \
  -d javaVersion=11 \
  -o spring-boot-app.zip

# Extract the project
unzip spring-boot-app.zip
cd spring-boot-app
```

#### Configure Maven for Nexus Repository

Create or update `~/.m2/settings.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 
          http://maven.apache.org/xsd/settings-1.0.0.xsd">
  
  <servers>
    <server>
      <id>nexus-releases</id>
      <username>your-username</username>
      <password>your-password</password>
    </server>
    <server>
      <id>nexus-snapshots</id>
      <username>your-username</username>
      <password>your-password</password>
    </server>
  </servers>
  
  <mirrors>
    <mirror>
      <id>nexus-public</id>
      <mirrorOf>*</mirrorOf>
      <name>Nexus Public Repository</name>
      <url>http://your-nexus-server:8081/repository/maven-public/</url>
    </mirror>
  </mirrors>
  
  <profiles>
    <profile>
      <id>nexus</id>
      <repositories>
        <repository>
          <id>nexus-releases</id>
          <name>Nexus Releases</name>
          <url>http://your-nexus-server:8081/repository/maven-releases/</url>
          <releases>
            <enabled>true</enabled>
          </releases>
          <snapshots>
            <enabled>false</enabled>
          </snapshots>
        </repository>
        <repository>
          <id>nexus-snapshots</id>
          <name>Nexus Snapshots</name>
          <url>http://your-nexus-server:8081/repository/maven-snapshots/</url>
          <releases>
            <enabled>false</enabled>
          </releases>
          <snapshots>
            <enabled>true</enabled>
          </snapshots>
        </repository>
      </repositories>
    </profile>
  </profiles>
  
  <activeProfiles>
    <activeProfile>nexus</activeProfile>
  </activeProfiles>
</settings>
```

#### Update Project's pom.xml

Add distribution management to your `pom.xml`:

```xml
<distributionManagement>
  <repository>
    <id>nexus-releases</id>
    <name>Nexus Releases</name>
    <url>http://your-nexus-server:8081/repository/maven-releases/</url>
  </repository>
  <snapshotRepository>
    <id>nexus-snapshots</id>
    <name>Nexus Snapshots</name>
    <url>http://your-nexus-server:8081/repository/maven-snapshots/</url>
  </snapshotRepository>
</distributionManagement>
```

### 4. Build and Deploy

```bash
# Build the project
mvn clean compile

# Run tests
mvn test

# Package the application
mvn package

# Deploy to Nexus
mvn deploy

# Run the application
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### 5. Environment Variables

Set up environment variables for Nexus:

```bash
# Add to your ~/.bashrc or ~/.zshrc
export NEXUS_URL="http://your-nexus-server:8081"
export NEXUS_USERNAME="your-username"
export NEXUS_PASSWORD="your-password"
export MAVEN_OPTS="-Xmx1024m"
```

### 6. Verification

Verify everything is working:

```bash
# Check Java version
java -version

# Check Maven version
mvn -version

# Test Nexus connectivity
curl -u $NEXUS_USERNAME:$NEXUS_PASSWORD $NEXUS_URL/service/rest/v1/repositories

# List available repositories
mvn help:effective-settings
```

## Troubleshooting

### Common Issues

1. **Java not found**: Make sure conda environment is activated
2. **Maven authentication failed**: Check credentials in `~/.m2/settings.xml`
3. **Nexus connection refused**: Verify Nexus server URL and port
4. **Permission denied**: Ensure user has deploy permissions in Nexus

### Useful Commands

```bash
# Deactivate conda environment
conda deactivate

# List conda environments
conda env list

# Remove conda environment
conda env remove -n java-dev

# Update conda
conda update conda

# Clean Maven cache
mvn dependency:purge-local-repository
```

## Project Structure

```
spring-boot-app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       └── DemoApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── com/example/demo/
│               └── DemoApplicationTests.java
├── pom.xml
└── README.md
```