#!/bin/bash

current_dir=$(pwd)
target_dir="src/modules"

if [[ "$current_dir" != *"$target_dir"* ]]; then
  echo "请在 $target_dir 路径下执行命令"
  echo -e "\n执行结束,按任意键退出..."
  read -n 1 -s -r
  exit 1
fi

read -p "请输入模块名: " module_name

model_name="models/$module_name.entity.ts"
validator_name="validator/$module_name.validator.ts"

nest generate controller "$module_name" --no-spec
nest generate module "$module_name" --no-spec
nest generate service "$module_name" --no-spec

echo -e "已创建目录 src/modules/$module_name\n"
echo "已创建文件 src/modules/$module_name/$module_name.controller.ts"
echo "已创建文件 src/modules/$module_name/$module_name.module.ts"
echo "已创建文件 src/modules/$module_name/$module_name.service.ts"

touch "../$model_name"
cat << EOF > "../$model_name"
export class Table {

}
EOF
echo -e "\n已创建文件 src/$model_name"

touch "../$validator_name"
cat << EOF > "../$validator_name"
export class Dto {

}
EOF
echo -e "\n已创建文件 src/$validator_name"

echo -e "\n全部文件和目录已创建完成"
echo -e "\n脚本执行完毕,按任意键退出..."
read -n 1 -s -r