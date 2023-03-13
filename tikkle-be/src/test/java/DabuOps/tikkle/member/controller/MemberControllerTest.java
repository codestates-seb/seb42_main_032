package DabuOps.tikkle.member.controller;

import DabuOps.tikkle.global.WithMockCustomMember;
import DabuOps.tikkle.member.dto.MemberDto;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.entity.Member.Gender;
import DabuOps.tikkle.member.entity.Member.MemberState;
import DabuOps.tikkle.member.mapper.MemberMapper;
import DabuOps.tikkle.member.service.MemberService;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.snippet.Attributes.attributes;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MemberController.class)
@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser(username = "kimcoding@gmail.com", roles = {"USER"})
public class MemberControllerTest {
    String BASE_URL = "/members";

    Member member = Member.builder()
        .id(1L)
        .email("test@gmail.com")
        .name("홍길동")
        .state(MemberState.ACTIVE)
        .payDay(25)
        .initDate(15)
        .gender(Gender.male)
        .location("seoul")
        .build();

    MemberDto.Post post = MemberDto.Post.builder()
        .email("test1@gmail.com")
        .name("홍길동2")
        .build();

    MemberDto.Patch patch = MemberDto.Patch.builder()
        .name("홍길동3")
        .payDay(10)
        .initDate(20)
        .location("NY")
        .build();

    MemberDto.Response response = MemberDto.Response.builder()
        .memberId(member.getId())
        .email(member.getEmail())
        .name(member.getName())
        .state(member.getState())
        .location(member.getLocation())
        .payDay(member.getPayDay())
        .gender(member.getGender())
        .initDate(member.getInitDate())
        .build();

    @Autowired
    MockMvc mockMvc;

    @MockBean
    MemberService memberService;

    @MockBean
    MemberMapper mapper;

    @Autowired
    Gson gson;

    @DisplayName("회원 생성")
    @Test
    void postMemberTest() throws Exception {
        String content = gson.toJson(post);
        given(memberService.createMember(Mockito.any(Member.class))).willReturn(member);

        ResultActions actions = mockMvc.perform(
            post(BASE_URL)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(content));

        actions
            .andExpect(status().isCreated())
            .andDo(document("Post-Member",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestFields(
                    attributes(key("title")
                        .value("Fields for user creation")),
                    fieldWithPath("email")
                        .type(JsonFieldType.STRING)
                        .description("회원 이메일"),
                    fieldWithPath("name")
                        .type(JsonFieldType.STRING)
                        .description("회원 이름")),
                responseHeaders(
                    headerWithName(HttpHeaders.LOCATION)
                        .description("Header Location, 리소스의 URL")
                )
            ));
    }
    @DisplayName("회원 수정")
    @Test
    @WithMockCustomMember
    void patchMemberTest() throws Exception{
        String content = gson.toJson(patch);

        member.setName(patch.getName());
        member.setLocation(patch.getLocation());
        member.setPayDay(patch.getPayDay());
        member.setInitDate(patch.getInitDate());

        given(mapper.patchDtoToMember(Mockito.any(MemberDto.Patch.class))).willReturn(new Member());
        given(memberService.updateMember(Mockito.any(Member.class))).willReturn(member);

        ResultActions actions = mockMvc.perform(
            patch(BASE_URL + "/{member-id}", member.getId())
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(content));

        actions
            .andExpect(status().isOk())
            .andDo(document("Patch-Member",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestHeaders(
                    attributes(key("title")
                        .value("Headers for user revision"))
                ),
                pathParameters(
                    parameterWithName("member-id")
                        .description("회원 아이디")),
                requestFields(
                    attributes(key("title")
                        .value("Fields for user revision")),
                    fieldWithPath("name")
                        .type(JsonFieldType.STRING)
                        .description("회원 이름"),
                    fieldWithPath("location")
                        .type(JsonFieldType.STRING)
                        .optional()
                        .description("회원 활동 지역"),
                    fieldWithPath("payDay")
                        .type(JsonFieldType.NUMBER)
                        .optional()
                        .description("급여일"),
                    fieldWithPath("initDate")
                        .type(JsonFieldType.NUMBER)
                        .optional()
                        .description("급여일")
                    )));

    }

//    @DisplayName("회원 조회")
//    @Test
//    @WithMockCustomMember
//    void getMember() throws Exception {
//
//        given(memberService.getMember(Mockito.anyLong())).willReturn(member);
//        given(mapper.memberToResponseDto(Mockito.any(Member.class))).willReturn(response);
//
//
//        ResultActions actions = mockMvc.perform(
//            get(BASE_URL + "/{member-id}", member.getId())
//                .with(csrf())
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON));
//
//        actions
//            .andExpect(status().isOk())
//            .andExpect(jsonPath("$.data.memberId").value(member.getId()))
//            .andExpect(jsonPath("$.data.location").value(member.getLocation()))
//            .andDo(document("Get-Member",
//                preprocessRequest(prettyPrint()),
//                preprocessResponse(prettyPrint()),
//                requestHeaders(
//                    attributes(key("title")
//                        .value("Headers for user revision"))),
//                pathParameters( // path parameter
//                    parameterWithName("member-id") // parameter 이름
//                        .description("회원 아이디")), // parameter 설명
//                responseFields( // 응답 필드
//                    fieldWithPath("data") // 필드 이름
//                        .type(JsonFieldType.OBJECT) // 필드 타입
//                        .description("조회 데이터"), // 필드 설명
//                    fieldWithPath("data.memberId")
//                        .type(JsonFieldType.NUMBER)
//                        .description("회원 아이디"),
//                    fieldWithPath("data.email")
//                        .type(JsonFieldType.STRING)
//                        .description("회원 이메일"),
//                    fieldWithPath("data.name")
//                        .type(JsonFieldType.STRING)
//                        .description("회원 이름"),
//                    fieldWithPath("data.picture")
//                        .type(JsonFieldType.STRING)
//                        .description("회원 사진"),
//                    fieldWithPath("data.location")
//                        .type(JsonFieldType.STRING)
//                        .description("회원 활동 지역"),
//                    fieldWithPath("data.about")
//                        .type(JsonFieldType.STRING)
//                        .description("회원 소개"),
//                    fieldWithPath("data.state")
//                        .type(JsonFieldType.STRING)
//                        .description("회원 상태"),
//                    fieldWithPath("data.isMine")
//                        .type(JsonFieldType.BOOLEAN)
//                        .description("본인 확인"),
//                    fieldWithPath("data.createdAt")
//                        .type(JsonFieldType.NULL)
//                        .description("가입일"),
//                    fieldWithPath("data.modifiedAt")
//                        .type(JsonFieldType.NULL)
//                        .description("최근 수정일"),
//                    fieldWithPath("data.lastLoginTime")
//                        .type(JsonFieldType.NULL)
//                        .description("마지막 접속일"))));
//    }

}
