#!/bin/bash
cp application_form.html printableWebForm.html;
sed -i "/<link/d" "printableWebForm.html";
sed -i "/<script/d" "printableWebForm.html";
bodyPosition=`cat printableWebForm.html | sed -n "/<body>/{=}"`;
tab="    ";
jsFiles=`find js/ -name '*.js'`;
cssFiles=`find css/ -name '*.css'`;
touch tmp;
head -$bodyPosition printableWebForm.html > tmp;
addMinificatedFiles() {
	echo "$tab$tab<$1>" >> tmp;
	for file in $2; do
		content=`cat $file >> tmp`;
		echo "$tab$tab$tab$content" >> tmp;
	done
	echo "$tab$tab</$1>" >> tmp;
}
addMinificatedFiles "script" "$jsFiles";
addMinificatedFiles "style" "$cssFiles";

sed -i 1,$((bodyPosition))d printableWebForm.html;
cat printableWebForm.html >> tmp;
mv tmp printableWebForm.html;