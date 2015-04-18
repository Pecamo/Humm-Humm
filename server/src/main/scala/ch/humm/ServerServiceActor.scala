package ch.humm

import spray.http.HttpRequest
import spray.http.HttpMethods._
import scala.concurrent.duration._
import akka.util.Timeout
import akka.actor._
import spray.http._
import MediaTypes._

class ServerServiceActor extends Actor with ActorLogging {

  implicit val timeout: Timeout = 1.second


  def receive = {
    case HttpRequest(GET, Uri.Path("/"), _, _, _) =>
      log.info("HERE")
      sender ! hello
    case _ =>
      log.info("Weird message received.")
      sender ! motFound
  }

  lazy val hello = HttpResponse(
    entity = HttpEntity(`text/html`,
      <html>
        <body>
          <h1>ma<i>RR</i>ant!</h1>
        </body>
      </html>.toString()
    )
  )

  lazy val motFound = HttpResponse(
    entity = HttpEntity(`text/html`,
      <html>
        <body>
          <h1>NOPE !</h1>
        </body>
      </html>.toString()
    )
  )

}
