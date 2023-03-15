package DabuOps.tikkle.Account.controller;

import DabuOps.tikkle.account.controller.AccountController;
import DabuOps.tikkle.account.dto.AccountDto;
import DabuOps.tikkle.account.entity.Account;
import DabuOps.tikkle.account.entity.Account.AccountState;
import DabuOps.tikkle.account.mapper.AccountMapper;
import DabuOps.tikkle.account.service.AccountService;
import DabuOps.tikkle.member.controller.MemberController;
import java.util.List;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.security.test.context.support.WithMockUser;
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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
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
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.restdocs.snippet.Attributes.attributes;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(AccountController.class)
@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser(username = "kimcoding@gmail.com", roles = {"USER"})
public class AccountControllerTest {
    String BASE_URL = "/accounts";

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

    Account account = Account.builder()
        .id(1L)
        .name("급여통장")
        .balance(1000000L)
        .bankName("산와머니")
        .member(member)
        .number("1234-01-1234")
        .state(AccountState.ACTIVE)
        .build();

    AccountDto.Post post = AccountDto.Post.builder()
        .name("적금")
        .number("41235-03-03241")
        .bankName("산와머니")
        .balance(100000000L)
        .build();

    AccountDto.Patch patch = AccountDto.Patch.builder()
        .name("여행 적금")
        .build();

    AccountDto.Response response1 = AccountDto.Response.builder()
        .id(1L)
        .name("적금")
        .number("1234-12-1234")
        .bankName("국민")
        .balance(120304012L)
        .state(AccountState.ACTIVE)
        .memberId(member.getId())
        .build();

    AccountDto.Response response2 = AccountDto.Response.builder()
        .id(1L)
        .name("예금")
        .number("1234-12-123344")
        .bankName("신한")
        .balance(12342152L)
        .state(AccountState.ACTIVE)
        .memberId(member.getId())
        .build();

    @Autowired
    MockMvc mockMvc;

    @MockBean
    AccountService accountService;

    @MockBean
    AccountMapper mapper;

    @Autowired
    Gson gson;

    @DisplayName("계좌 생성")
    @Test
    @WithMockCustomMember
    void postAccountTest() throws Exception{
        String content = gson.toJson(post);
        given(mapper.postDtoToAccount(Mockito.any(AccountDto.Post.class)))
            .willReturn(new Account());
        given(accountService.createAccount(Mockito.any(Account.class),Mockito.anyLong()))
            .willReturn(account);

        ResultActions actions = mockMvc.perform(
            post(BASE_URL)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(content)
        );

        actions
            .andExpect(status().isCreated())
            .andDo(document("Post-Account",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestFields(
                    attributes(key("title")
                        .value("Fields for account creation")),
                    fieldWithPath("name")
                        .type(JsonFieldType.STRING)
                        .description("계좌 별명"),
                    fieldWithPath("number")
                        .type(JsonFieldType.STRING)
                        .description("계좌 번호"),
                    fieldWithPath("bankName")
                        .type(JsonFieldType.STRING)
                        .description("은행 이름"),
                    fieldWithPath("balance")
                        .type(JsonFieldType.NUMBER)
                        .description("잔액")),
                responseHeaders(
                    headerWithName(HttpHeaders.LOCATION)
                        .description("Header Location, 리소스의 URL")
                )
            ));

    }

    @DisplayName("계좌 수정")
    @Test
    @WithMockCustomMember
    void patchAccountTest() throws Exception{
        String content = gson.toJson(patch);

        given(mapper.patchDtoToAccount(Mockito.any(AccountDto.Patch.class)))
            .willReturn(new Account());
        given(accountService.updateAccount(
            Mockito.any(Account.class),Mockito.anyLong(),Mockito.anyLong()))
            .willReturn(account);

        ResultActions actions = mockMvc.perform(
            patch(BASE_URL + "/{account-id}", account.getId())
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(content));

        actions
            .andExpect(status().isOk())
            .andDo(document("Patch-Account",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestHeaders(
                    attributes(key("title")
                        .value("Headers for account revision"))
                ),
                pathParameters(
                    parameterWithName("account-id")
                        .description("계좌 식별자")),
                requestFields(
                    attributes(key("title")
                        .value("Fields for account revision")),
                    fieldWithPath("name")
                        .type(JsonFieldType.STRING)
                        .description("계좌 설정 이름")
                )));

    }
    @DisplayName("계좌 조회")
    @Test
    void getAccountsTest() throws Exception {
        given(accountService.getAccounts(Mockito.anyLong()))
            .willReturn(List.of(new Account(), new Account()));
        given(mapper.accountsToResponseDtos(Mockito.anyList()))
            .willReturn(List.of(response1, response2));

        ResultActions actions = mockMvc.perform(
            get(BASE_URL)
                .accept(MediaType.APPLICATION_JSON));

        actions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.*").exists())
            .andExpect(jsonPath("$.data[0].id").exists())
            .andExpect(jsonPath("$.data[0].name").exists())
            .andExpect(jsonPath("$.data[0].memberId").exists())
            .andExpect(jsonPath("$.data[0].number").exists())
            .andExpect(jsonPath("$.data[0].bankName").exists())
            .andExpect(jsonPath("$.data[0].balance").exists())
            .andExpect(jsonPath("$.data[0].state").exists())
            .andDo(document("Get-Accounts",
                preprocessResponse(prettyPrint()),
                responseFields(
                    fieldWithPath("data[]")
                        .type(JsonFieldType.ARRAY)
                        .description("계좌 리스트"),
                    fieldWithPath("data[].id")
                        .type(JsonFieldType.NUMBER)
                        .description("계좌 식별자"),
                    fieldWithPath("data[].name")
                        .type(JsonFieldType.STRING)
                        .description("계좌 이름"),
                    fieldWithPath("data[].bankName")
                        .type(JsonFieldType.STRING)
                        .description("은행 이름"),
                    fieldWithPath("data[].balance")
                        .type(JsonFieldType.NUMBER)
                        .description("계좌 잔액"),
                    fieldWithPath("data[].number")
                        .type(JsonFieldType.STRING)
                        .description("계좌 번호"),
                    fieldWithPath("data[].state")
                        .type(JsonFieldType.STRING)
                        .description("계좌 상태"),
                    fieldWithPath("data[].memberId")
                        .type(JsonFieldType.NUMBER)
                        .description("계좌 소유주 식별자"),
                    fieldWithPath("data[].createdAt")
                        .type(JsonFieldType.NULL)
                        .description("계좌 등록 날짜"),
                    fieldWithPath("data[].modifiedAt")
                        .type(JsonFieldType.NULL)
                        .description("계좌 수정 날짜")
                ))
            );
    }

    @DisplayName("계좌 삭제")
    @Test
    @WithMockCustomMember
    void deleteAccount() throws Exception {
        doNothing().when(accountService).deleteAccount(account.getId(),member.getId());

        ResultActions actions = mockMvc.perform(
            delete(BASE_URL + "/{account-id}", account.getId())
                .with(csrf())
                .accept(MediaType.APPLICATION_JSON));


        actions
            .andExpect(status().isNoContent())
            .andExpect(jsonPath("$.data").doesNotExist()) // json 응답이 없음.
            .andDo(document("Delete-Account",
                preprocessRequest(prettyPrint()),
                requestHeaders(
                    attributes(key("title")
                        .value("Headers for user revision"))
                ),
                pathParameters( // path parameter
                    parameterWithName("account-id").description("계좌 식별자")
                )));
    }


}
