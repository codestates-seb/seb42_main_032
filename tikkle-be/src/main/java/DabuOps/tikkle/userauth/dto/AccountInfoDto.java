package DabuOps.tikkle.userauth.dto;

import DabuOps.tikkle.account.entity.Account;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountInfoDto {
    private String apiTranId;
    private String rspCode;
    private String rspMessage;
    private String apiTranDtm;
    private String userSeqNo;
    private String userCi;
    private String userName;
    private String resCnt;
    private List<ResList> resList;
}
