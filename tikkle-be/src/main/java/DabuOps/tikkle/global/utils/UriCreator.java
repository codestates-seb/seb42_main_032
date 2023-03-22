package DabuOps.tikkle.global.utils;

import java.net.URI;
import org.springframework.web.util.UriComponentsBuilder;

public class UriCreator {
    public static URI createURI(String url, long resourceId) {
        return UriComponentsBuilder
            .newInstance()
            .path(url + "/{resource-id}")
            .buildAndExpand(resourceId)
            .toUri();
    }
    public static URI createURIWithoutResourceId(String url) {
        return UriComponentsBuilder
                .newInstance()
                .path(url)
                .buildAndExpand()
                .toUri();
    }
    public static URI validateToken(String url, String accessToken){
        return UriComponentsBuilder
            .newInstance()
            .path(url + "{access-token}")
            .buildAndExpand()
            .toUri();
    }
}
