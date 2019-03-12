require 'capistrano-rbenv'
require "bundler/capistrano"

# Bonus! Colors are pretty!
def red(str)
  "\e[31m#{str}\e[0m"
end

# Figure out the name of the current local branch
def current_git_branch
  branch = `git symbolic-ref HEAD 2> /dev/null`.strip.gsub(/^refs\/heads\//, '')
  puts "Deploying branch #{red branch}"
  branch
end

set :default_environment, {
  'PATH' => "$HOME/.rbenv/shims:$HOME/.rbenv/bin:$PATH"
}
set :bundle_flags, "--deployment --quiet --binstubs --shebang ruby"
set :rbenv_ruby_version, "1.9.3-p125"

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

server "198.211.126.85", :web, :app, :db, primary: true
set :server_name, "criterio.imesmes.com"

set :user, "deployer"
set :application, "criterio"
set(:deploy_to) { "/home/#{user}/apps/#{application}" }
set :deploy_via, :remote_cache
set :use_sudo, false

set :scm, "git"
set :repository,  "git@bitbucket.org:abesorasans/#{application}"
set :branch, current_git_branch

default_run_options[:shell] = '/bin/zsh'
default_run_options[:pty] = true
ssh_options[:forward_agent] = true

#before "deploy:restart", "bundle:install"
#before "deploy:restart", "npm:install"
#before "deploy:restart", "bower:install"
before "deploy:restart", "gulp:build"

# if you want to clean up old releases on each deploy uncomment this:
after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end

#namespace :bundle do
#  task :install do
#    invoke_command "bash -c 'cd #{current_path} && bundle install'", :via => run_method
#  end
#end

namespace :npm do
  task :install do
    invoke_command "bash -c '. /home/deployer/.nvm/nvm.sh && cd #{current_path} && npm install'", :via => run_method
  end
end

namespace :bower do
  task :install do
    invoke_command "bash -c '. /home/deployer/.nvm/nvm.sh && cd #{current_path} && bower install'", :via => run_method
  end
end

namespace :gulp do
  task :build do
    run "cd #{current_path} && gulp build"
  end
end

namespace :grunt do
  task :build do
    invoke_command "bash -c '. /home/deployer/.nvm/nvm.sh && cd #{current_path} && grunt build'", :via => run_method
  end
end
