package DabuOps.tikkle.member.entity;

import DabuOps.tikkle.global.audit.Auditable;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import java.lang.annotation.Retention;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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

    @Column(nullable = false)
    private String name;

    @Column(length = 210)
    private String location;

    @Column
    @Builder.Default
    @Enumerated(value = EnumType.STRING)
    private MemberState state = MemberState.ACTIVE;

    @Column
    private Gender gender;

    @Column
    private Integer payDay;

    @Column
    private Integer initDate;

    @Column(nullable = false)
    private String picture = "이미지";

    @OneToMany
    @JoinColumn(name = "MEMBER_CATEGORY_ID")
    private MemberCategory memberCategory;

    public void setMemberCategory(MemberCategory memberCategory) {
        this.memberCategory = memberCategory;
    }

    @Builder
    public Member(Long id, String email, String name, String location, MemberState state,
        Gender gender,
        Integer payDay, Integer initDate, String picture, MemberCategory memberCategory) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.location = location;
        this.state = state;
        this.gender = gender;
        this.payDay = payDay;
        this.initDate = initDate;
        this.picture = picture;
        this.memberCategory = memberCategory;
    }

    public Member(String email, String name, String picture) {

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
        ACTIVE("활성"),
        DORMANT("휴면"),
        DELETED("탈퇴");

        @Getter
        private String state;

        MemberState(String state) {
            this.state = state;
        }
    }
}
