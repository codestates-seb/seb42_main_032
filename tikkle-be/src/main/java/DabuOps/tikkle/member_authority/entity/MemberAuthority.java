//package DabuOps.tikkle.member_authority.entity;
//
//import DabuOps.tikkle.global.audit.Auditable;
//import DabuOps.tikkle.member.entity.Member;
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Builder
//@NoArgsConstructor
//@Getter
//@Setter
//public class MemberAuthority extends Auditable {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column
//    private String access_token;
//
//    @ManyToOne // MEMBER n:1 단방향
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
//
//    @Builder
//    public MemberAuthority(Long id, String access_token, Member member) {
//        this.id = id;
//        this.access_token = access_token;
//        this.member = member;
//    }
//}
