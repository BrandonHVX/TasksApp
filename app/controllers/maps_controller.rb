class MapsController < ApplicationController
  def show
    respond_to do |format|
      format.html do
        @coordinates = request.location.coordinates.reverse
        @coordinates = [0.0, 0.0] if @coordinates.empty?
      end
      format.json do
        @tasks = current_user.tasks.near([params[:lat], params[:lng]], 10)
        render json:  {
                         type: "FeatureCollection",
                         features: @tasks.map do |task|
                           {
                             type: "Feature",
                             geometry: {
                               type: "Point",
                               coordinates: [
                                 task.longitude,
                                 task.latitude
                               ]
                             },
                             properties: {
                               description: task.description,
                               id: task.id
                             }
                           }
                         end
                       }
      end
    end
  end
end
