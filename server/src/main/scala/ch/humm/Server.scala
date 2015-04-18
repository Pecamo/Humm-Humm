package ch.humm

import akka.actor.{ActorSystem, Props}
import akka.io.IO
import com.typesafe.config.ConfigFactory
import spray.can.Http

import scala.concurrent.ExecutionContext


object Server extends App {
  // we Server an ActorSystem to host our application in
  implicit val system = ActorSystem("server")
  implicit val context = ExecutionContext.Implicits.global
  val conf = ConfigFactory.load()
  val protocol = "http://"
  //make sure the following env variables are defined on your system
  val hostName = "localhost"
  val port = 8080
  // create and start our service actor
  val service = system.actorOf(Props[ServerServiceActor], "server-service")

  IO(Http) ! Http.Bind(service, interface = hostName, port = port)
}

