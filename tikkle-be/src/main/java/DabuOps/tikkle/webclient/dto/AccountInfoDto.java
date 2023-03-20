package DabuOps.tikkle.webclient.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountInfoDto {
    private String fintechUseNum;
    private String accountAlias;
    private String bankCodeStd;
    private String bankCodeSub;
    private String bankName;
    private String accountNumMasked;
    private String accountHolderName;
    private String accountHolderType;
    private String inquiryAgreeYn;
    private String inquiryAgreeDtime;
    private String transferAgreeYn;
    private String transferAgreeDtime;
    private String payerNum;
    private String savingsBankName;
    private String accountSeq;
    private String accountType;

}
