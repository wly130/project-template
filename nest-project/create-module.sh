#!/bin/bash

read -p "请输入模块名: " module_name

model_name="../models/$module_name.entity.ts"
validator_name="../validator/$module_name.validator.ts"

nest generate module "$module_name" --no-spec
nest generate controller "$module_name" --no-spec
nest generate service "$module_name" --no-spec

touch $model_name
cat << EOF > "$model_name"
import {Entity} from 'typeorm';

@Entity({ name: '' })
export class Table {

}
EOF

touch $validator_name
cat << EOF > "$validator_name"
export class Dto {

}
EOF

echo -e "\n 创建完成"
echo -e "\n 脚本执行完毕,按任意键退出..."
read -n 1 -s -r