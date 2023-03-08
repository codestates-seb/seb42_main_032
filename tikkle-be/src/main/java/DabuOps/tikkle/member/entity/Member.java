package DabuOps.tikkle.member.entity;

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
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 210)
    private String location;

    @CreationTimestamp
    @Column(name = "CREATED_AT", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "MODIFIED_AT")
    private LocalDateTime modifiedAt;

    @Column
    @Builder.Default
    @Enumerated(value = EnumType.STRING)
    private MemberState state = MemberState.ACTIVE;

    @Column
    private boolean gender;

    @Column
    private Integer payDay;

    @Column
    private Integer initDate;

    @Column
    private List<Detail> details;

    @Builder
    public Member(Long memberId, String email, String location, LocalDateTime createdAt,
        LocalDateTime modifiedAt, MemberState state, boolean gender, Integer payDay,
        Integer initDate,
        List<Detail> details) {
        this.memberId = memberId;
        this.email = email;
        this.location = location;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.state = state;
        this.gender = gender;
        this.payDay = payDay;
        this.initDate = initDate;
        this.details = details;
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
