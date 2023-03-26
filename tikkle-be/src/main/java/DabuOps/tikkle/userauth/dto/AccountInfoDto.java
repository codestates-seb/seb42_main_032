package DabuOps.tikkle.userauth.dto;

import DabuOps.tikkle.account.entity.Account;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class AccountInfoDto {
    private String apiTranId;
    private String rspCode;
    private String rspMessage;
    private String apiTranDtm;
    private String userSeqNo;
    private String userCi;
    private String userName;
    private String resCnt;
    private List<Map<String, Object>> resList;
    private String fintechUserNum;
}
