package DabuOps.tikkle.member.controller;

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
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.snippet.Attributes.attributes;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MemberController.class)
@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
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
        .initdate(20)
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

    @DisplayName("creation member")
    @Test
    void postMemberTest() throws Exception {
        String content = gson.toJson(post);
        given(memberService.createMember(Mockito.any(Member.class))).willReturn(member);

        ResultActions actions = mockMvc.perform(
            post(BASE_URL)
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

}
