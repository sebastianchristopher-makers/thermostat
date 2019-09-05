require 'rack'
require 'sinatra'
require 'sinatra/base'
require 'json'

class Server < Sinatra::Base
  set :public_folder, proc { File.join(root) }
  enable :sessions

  get '/' do
    erb(:index)
  end

  get '/sessions' do
    headers 'Access-Control-Allow-Origin' => '*'
    file = File.read('APIkeys.json')
    data_hash = JSON.parse(file)
    { mapsKey: data_hash["mapsKey"], city: session[:city], temperature: session[:temperature], powerSavingMode: session[:power_saving_mode] }.to_json
  end

  post '/sessions' do
    headers 'Access-Control-Allow-Origin' => '*'
    session[:city] = params[:city] if params[:city]
    session[:temperature] = params[:temperature] if params[:temperature]
    session[:power_saving_mode] = params[:powerSavingMode] if params[:powerSavingMode]
    redirect '/sessions'
  end
  run! if app_file == $PROGRAM_NAME
end
