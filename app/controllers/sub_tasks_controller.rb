class SubTasksController < ApplicationController
  before_action :set_task, only: [:create, :index]
  before_action :set_sub_task, only: [:update, :destroy]

  def create
    @sub_task = @task.sub_tasks.new(sub_task_params)
    if @sub_task.save
      redirect_to task_sub_tasks_path(@task),
        notice: "Successfully created SubTask."
    else
      redirect_to task_sub_tasks_path(@task),
        alert: "Could not create SubTask: #{@sub_task.errors.full_messages.join(', ')}."
    end
  end

  def update
    @sub_task.update(sub_task_params)
    redirect_to task_sub_tasks_path(@sub_task.task),
      notice: "Successfully updated SubTask."
  end

  def index
    @sub_task = SubTask.new
  end

  def destroy
    @sub_task.destroy
    redirect_to task_sub_tasks_path(@sub_task.task), notice: "Successfully Destroyed SubTask."
  end

  private

  def set_task
    @task = Task.find(params[:task_id])
    redirect_to root_path, alert: "Naughty naughty!!" unless @task.user == current_user
  end

  def set_sub_task
    @sub_task = SubTask.find(params[:id])
    redirect_to root_path, alert: "Naughty naughty!!" unless @sub_task.task.user == current_user
  end

  def sub_task_params
    params.require(:sub_task).permit(:description, :completed)
  end

end
