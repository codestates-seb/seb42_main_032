package DabuOps.tikkle.webclient.service;

import io.netty.channel.ChannelOption;
import java.net.http.HttpClient;
import java.time.Duration;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class WebclientService {
    WebClient client = WebClient.create();


    HttpClient httpClient = HttpClient.create()
        .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000)
        .responseTimeout(Duration.ofMillis(5000))
        .doOnConnected(conn ->
            conn.addHandlerLast(new ReadTimeoutHandler(5000, TimeUnit.MILLISECONDS))
                .addHandlerLast(new WriteTimeoutHandler(5000, TimeUnit.MILLISECONDS)));
}
