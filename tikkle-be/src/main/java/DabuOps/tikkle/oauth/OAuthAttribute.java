package DabuOps.tikkle.oauth;

import DabuOps.tikkle.member.entity.Member;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuthAttribute {
    private Map<String, Object> attribute;
    private String nameAttributeKey;
    private String name;
    private String email;

    @Builder
    public OAuthAttribute(Map<String, Object> attribute, String nameAttributeKey, String name,
        String email) {
        this.attribute = attribute;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
    }

    static OAuthAttribute of(String registrationId, String nameAttributeName,
        Map<String, Object> attribute) {
        return OAuthAttribute.builder()
            .name((String) attribute.get("name"))
            .email((String) attribute.get("email"))
            .attribute(attribute)
            .nameAttributeKey(nameAttributeName)
            .build();
    }

    public Member toEntity(){
        return Member.builder()
            .name(name)
            .email(email)
            .build();
    }
}
