require 'rake'
require 'rake/clean'
require 'fileutils'

# Defines
Home = Rake.original_dir

ClobberList = [
  "#{Home}/*.deb",
]

CLOBBER.include(ClobberList)

@tasks_help = []
def hdoc command, desc
  @tasks_help << [command, desc]
end

hdoc 'clobber', 'run the nodejs web server'

task :default => [:help]

task :help do
  @tasks_help.each do |task|
    if task[1].size > 0
      output = "  rake %-20s: %s" % [task[0], task[1]]
    else
      output = "\n+ %-30s %s\n\n" % [task[0], '*'*60 ]
    end
    puts output
  end
end

hdoc 'run_node', 'run the nodejs web server'
task :run_node do
  sh "node server/nodejs/http.js"
end