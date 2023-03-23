package DabuOps.tikkle.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    CANNOT_CHANGE_CATEGORY_STATUS(400, "Cannot change category status : 이미 예산을 설정해두었습니다."),
    CATEGORY_NOT_FOUND(404, "Cannot found category : 존재하지 않는 카테고리입니다."),
    CATEGORY_IS_INACTIVE(400, "Category is inactive : 비활성화된 카테고리입니다."),
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    MEMBER_UNAUTHORIZED(401, "Member Unauthorized"),
    MEMBER_NOT_MATCH(403, "Member Not Match"),
    MEMBER_EMAIL_EXISTS(409, "Email Already Exist."),
    TRANSACTION_HISTORY_NOT_FOUND(404, "Transaction History Not Found : 존재하지 않는 거래내역입니다."),
    ACCOUNT_NOT_FOUND(404, "Account Not Found"),
    ACCOUNT_NUMBER_EXIST(409, "Account Not Found"),
    BUDGET_NOT_FOUND(404, "Budget Not Found"),
    BUDGET_IS_INACTIVE(403, "Budget is Inactive"),
    CURATION_NOT_FOUND(404, "Curation Not Found"),
    CURATION_IS_INACTIVE(403, "Curation is Inactive"),
    TAG_NOT_FOUND(404, "Tag Not Found"),
    TAG_EXISTS(409, "Tag Already Exist."),
    TAG_IS_INACTIVE(403, "Tag is Inactive");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}