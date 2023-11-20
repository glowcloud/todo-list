package orogala.todolist.backend.model;

public class LoginResponse {
    private String jwt;

    public LoginResponse(){
        super();
    }

    public LoginResponse(String jwt){
        this.jwt = jwt;
    }
    public String getJwt(){
        return this.jwt;
    }

    public void setJwt(String jwt){
        this.jwt = jwt;
    }

}
