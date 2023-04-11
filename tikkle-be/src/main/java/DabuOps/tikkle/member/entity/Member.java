package DabuOps.tikkle.member.entity;

import DabuOps.tikkle.global.audit.Auditable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

@Entity
@Builder
@NoArgsConstructor
@Getter
@Setter
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = true)
    private String name;

    @Column(length = 210)
    private String location;

    @Column
    @Builder.Default
    @Enumerated(value = EnumType.STRING)
    private MemberState state = MemberState.USERSETTING;

    @Column
    @Enumerated(value = EnumType.STRING)
    private Gender gender;

    @Column
    private Integer payDay;

    @Column
    private Integer payAmount;

    @Column
    private Integer totalBudget;

    @Column
    @Builder.Default
    private Integer initDate = 1;

    @Column(nullable = true)
    private String picture = "이미지";

    @Column
    @Builder.Default
    @Enumerated(value = EnumType.STRING)
    private MemberRole role = MemberRole.REGULAR;

    @Column(length = 410)
    private String accessToken;

    @Builder
    public Member(Long id, String email, String name, String location, MemberState state, Gender gender, Integer payDay, Integer payAmount, Integer totalBudget, Integer initDate, String picture, MemberRole role, String accessToken) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.location = location;
        this.state = state;
        this.gender = gender;
        this.payDay = payDay;
        this.payAmount = payAmount;
        this.totalBudget = totalBudget;
        this.initDate = initDate;
        this.picture = picture;
        this.role = role;
        this.accessToken = accessToken;
    }

    public static enum Gender{
        male("남성"),
        female("여성");

        @Getter
        private String gender;

        Gender(String gender){
            this.gender = gender;
        }

    }

    public static enum MemberState {
        USERSETTING("회원 정보 설정 필요"),
        CATEGORYEDIT("카테고리 설정 필요"),
        BUDGETSETTING("예산 설정 필요"),
        ACTIVE("활성"),
        DORMANT("휴면"),
        DELETED("탈퇴");

        @Getter
        private String state;

        MemberState(String state) {
            this.state = state;
        }
    }

    public static enum MemberRole {
        CURATOR("큐레이터"),
        REGULAR("일반");
        @Getter
        private String role;

        MemberRole(String role) {
            this.role = role;
        }
    }
}
