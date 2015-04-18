package ch.humm

import spray.can.Http
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
    case _: Http.Connected => sender ! Http.Register(self)

    case HttpRequest(GET, Uri.Path("/"), headers, entity, protocol) =>
      log.debug("" + headers)
      log.debug("" + entity)
      log.debug("" + protocol)
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
