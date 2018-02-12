function repeatchar {
    char=$1
    count=$2
    echo $(for i in $(seq 1 $count); do printf $char; done)
}

function marquee {
    text=$1
    padded="##\ $text /##"
    len=${#padded}
    border=$(repeatchar "#" $len)

    echo
    echo $border
    echo $padded
    echo $border
}
