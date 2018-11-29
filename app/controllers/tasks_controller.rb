class TasksController < ApplicationController
  before_action :set_task, only: [:update, :destroy]

  skip_before_action :verify_authenticity_token

  # GET /tasks
  def index
    @task = Task.new
    @completed  = params[:completed] == "true"
    @term       = params[:term] || ''
    if @completed
      @tasks = current_user.tasks.completed.ordered
    else
      @tasks = current_user.tasks.incomplete.ordered
    end
    @tasks        = @tasks.search(@term)
    @page         = (params[:page] || 1).to_i
    @per_page     = 5
    @total_pages  = @tasks.count / @per_page
    @total_pages  = 1 if @tasks.count.zero?
    @total_pages  += 1 unless (@tasks.count % @per_page).zero?
    @tasks        = @tasks.paginate(page: @page, per_page: @per_page)
    @tasks        = @tasks.map do |task|
                      task.attributes.merge(
                        "due_date"    => task.due_date&.strftime('%-m/%-d/%y'),
                        "description" => task.description.truncate(100)
                      )
                    end
    respond_to do |format|
      format.html
      format.json do
        render json: {
          tasks:        @tasks,
          total_pages:  @total_pages,
          page:         @page
        }
      end
    end
  end

  # POST /tasks
  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      redirect_to tasks_path,
        notice: 'Task was successfully created.'
    else
      redirect_to tasks_path,
        alert: "Could not save task: #{@task.errors.full_messages.join(', ')}"
    end
  end

  # PATCH /tasks
  def update
    @task.update(task_params)
    flash.notice = "Task was successfully updated."
    head :ok
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
    flash.notice = 'Task was successfully destroyed.'
    head :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = current_user.tasks.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params
        .require(:task)
        .permit(
          :description,
          :completed,
          :due_date,
          :street,
          :city,
          :state,
          :country,
          :latitude,
          :longitude,
          :use_current_location
        )
    end
end
