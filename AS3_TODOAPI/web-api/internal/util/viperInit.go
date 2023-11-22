package util

import (
	"strings"

	"github.com/spf13/viper"
)

func InitViper() {
	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
}