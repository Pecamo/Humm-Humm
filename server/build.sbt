name := "humm_humm"

version := "1.0"

scalaVersion  := "2.10.4"

scalacOptions ++= Seq("-unchecked", "-deprecation", "-encoding", "utf8")

libraryDependencies ++= {
  val akkaV = "2.3.0"
  val sprayV = "1.3.1"
  val googleV = "1.18.0-rc"
  val json4sV = "3.2.10"
  Seq(
    "org.reactivemongo" %% "reactivemongo" % "0.10.5.0.akka23",
    "io.spray"            %   "spray-can"     % sprayV,
    "io.spray"            %   "spray-routing" % sprayV,
    "io.spray"            %   "spray-http"    % sprayV,
    "io.spray"            %   "spray-util"    % sprayV,
    "io.spray"            %   "spray-httpx"   % sprayV,
    "io.spray"            %%  "spray-json"    % "1.2.6",
    "io.spray"            %  "spray-client"   % sprayV,
    "io.spray"            %   "spray-testkit" % sprayV  % "test",
    "com.typesafe.akka"   %%  "akka-actor"    % akkaV,
    "com.typesafe.akka"   %%  "akka-testkit"  % akkaV   % "test",
    "org.scalatest" % "scalatest_2.10" % "2.0" % "test",
    "com.github.nscala-time" %% "nscala-time" % "1.4.0",
    "org.json4s"          %% "json4s-native"  % json4sV,
    "org.json4s"          %% "json4s-jackson" % json4sV,
    "org.json4s"          %% "json4s-ext"     % json4sV
  )
}

resolvers ++= Seq("spray" at "http://repo.spray.io/")

resolvers ++= Seq("snapshots", "releases").map(Resolver.sonatypeRepo)

resolvers ++= Seq("Sonatype Snapshots" at "https://oss.sonatype.org/content/repositories/snapshots/")

resolvers += "Typesafe Simple Repository" at
  "http://repo.typesafe.com/typesafe/simple/maven-releases/"

assemblyJarName in assembly := "humm-humm.jar"

Revolver.settings
