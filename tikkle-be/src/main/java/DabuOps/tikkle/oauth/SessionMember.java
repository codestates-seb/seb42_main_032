package DabuOps.tikkle.oauth;

import DabuOps.tikkle.member.entity.Member;
import java.io.Serializable;
import lombok.Getter;

@Getter
public class SessionMember implements Serializable {
    private String name;
    private String email;

    public SessionMember(Member member) {
        this.name = member.getName();
        this.email = member.getEmail();
    }
}
