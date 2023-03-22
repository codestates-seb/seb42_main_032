package DabuOps.tikkle.oauth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
* Google에서 받아 올 UserInfo
 */
@Getter
@AllArgsConstructor
public class UserInfo {
    private String email;
    private String name;
    private String picture;
}
