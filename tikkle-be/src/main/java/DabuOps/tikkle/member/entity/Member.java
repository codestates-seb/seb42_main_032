package DabuOps.tikkle.member.entity;

import DabuOps.tikkle.global.audit.Auditable;
import java.time.LocalDateTime;
import java.util.List;
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

    @Builder
    public Member(Long id, String email, String name, String location, MemberState state, Gender gender, Integer payDay,
        Integer initDate) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.location = location;
        this.state = state;
        this.gender = gender;
        this.payDay = payDay;
        this.initDate = initDate;
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
