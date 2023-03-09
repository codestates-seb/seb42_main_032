package DabuOps.tikkle.oauth;

import java.util.Map;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OAuthAttribute {
    private Map<String, Object> attribute;
    private String nameAttributeKey;
    private String name;
    private String email;

    private static OAuthAttribute Google(Map<String, Object> attribute, String nameAttributeKey) {
        return OAuthAttribute.builder()
            .name((String) attribute.get("name"))
            .email((String) attribute.get("email"))
            .attribute(attribute)
            .build();
    }
}
