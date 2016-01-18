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
echo "$tab$tab<script>" >> tmp;
for file in $jsFiles; do
	cat $file >> tmp;
done
echo "$tab$tab</script>" >> tmp;
echo "$tab$tab<style>" >> tmp;
for file in $cssFiles; do
	cat $file >> tmp;
done
echo "$tab$tab</style>" >> tmp;
sed -i 1,$((bodyPosition))d printableWebForm.html;
cat printableWebForm.html >> tmp;
mv tmp printableWebForm.html;