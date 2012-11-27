#!/bin/bash

function install {
    test=""
    if [ "$2" = "global" ]; then
        test=`npm -g list $1 | grep $1`
    else
        test=`npm list $1 | grep $1`
    fi

    if [ "$test" = "" ]; then
        echo "Installing $1"
        if [ "$2" = "global" ]; then
            sudo npm -g install $1
        else
            npm install $1
        fi
    fi
}

CMDS="npm"

for i in $CMDS
do
    # command -v will return >0 when the $i is not found
    command -v $i >/dev/null && continue || { echo "[$i] : Command not found. Please install node from http://nodejs.org/"; exit 1; }
done

read -p "Give a name for the new project? : " projectName
read -p "Give absolute path for the project? : " path

if [ ! -d "$path" ]; then
    echo 'Invalid path, exiting!'
    exit 0
fi

echo "Project name: $projectName"
echo "Project path: $path/$projectName"

read -p "Do you wish to continue Installing (yes/no)? : " confirm

if [ "$confirm" = "yes" ] || [ "$confirm" = "y" ]; then
    mkdir $path/$projectName
    cp -r application $path/$projectName/.
    cp -r tasks $path/$projectName/.
    cp -r tests $path/$projectName/.
    cp http-server.js $path/$projectName/.
    cp grunt.js $path/$projectName/.

    cd ~
    currentPath=`pwd`
    echo "Installing node_modules to $currentPath/node_modules"


    SYSWIDE_NPM_DEPS="jamjs grunt"
    LOCAL_NPM_DEPS="wrench node-static http-proxy grunt-clean grunt-recess grunt-requirejs grunt-mocha"

    echo "Installing system wide dependencies [$SYSWIDE_NPM_DEPS], we need to sudo to do that."
    for DEPENDENCY in $SYSWIDE_NPM_DEPS
    do
        install $DEPENDENCY global
    done

    echo "Installing local dependencies [$LOCAL_NPM_DEPS]"
    for DEPENDENCY in $LOCAL_NPM_DEPS
    do
        install $DEPENDENCY
    done

    # Install project dependencies
    cd $path/$projectName/application
    jam install backbone jquery underscore underscore.string less bootstrap transparency keymaster domReady
    cd ..

    if [ ! -d ~/.grunt ]
    then
        mkdir ~/.grunt
    fi

    rm ~/.grunt/tasks
    ln -s `pwd`/tasks ~/.grunt/tasks

    ln -s ~/node_modules node_modules

    cd node_modules
    if [ ! -d "grunt-bunyip" ]; then
        git clone git://github.com/Houston-Inc/grunt-bunyip.git
    fi
else
    echo "Installation canceled!"
    exit 0
fi


