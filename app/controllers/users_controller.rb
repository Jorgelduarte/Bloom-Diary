class UsersController < ApplicationController

  # skip_before_action :verify_authenticity_token  

  def me
    render :json => @current_user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      render :json => @user
    else
      render :json => { :errors => @user.errors.full_messages }
    end
  end


  def update
    @user = User.find(params[:id])
    if @user
      @user.update(update_params)
      session[:user_id] = @user.id
      render :json => {
        status: 200,
        data: @user,
        message: "Successfully update!"
      }.to_json
    end 
  end


private 


  def user_params
    params.permit(:nickname, :email, :password, :password_confirmation)
  end

  def update_params
    params.permit(:nickname, :email)
  end

end
