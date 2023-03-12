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
}
