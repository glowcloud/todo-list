package orogala.todolist.backend.model;

public class LoginResponse {
    private TodoUser user;
    private String jwt;

    public LoginResponse(){
        super();
    }

    public LoginResponse(TodoUser user, String jwt){
        this.user = user;
        this.jwt = jwt;
    }

    public TodoUser getUser(){
        return this.user;
    }

    public void setUser(TodoUser user){
        this.user = user;
    }

    public String getJwt(){
        return this.jwt;
    }

    public void setJwt(String jwt){
        this.jwt = jwt;
    }

}
