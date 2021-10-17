class Validations::BaseValidator

  include ActiveModel::Validations

  protected

  def set_parameters(params)
    params.each do |key, value|
      self.send(:"#{key}=", value) rescue nil
    end
  end
end
