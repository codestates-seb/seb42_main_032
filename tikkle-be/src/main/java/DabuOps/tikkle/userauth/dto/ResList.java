package DabuOps.tikkle.userauth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ResList {
    private String fintechUseNum;

    public String getFintechUseNum() {
        return fintechUseNum;
    }
}
