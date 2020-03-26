d3.select('#reset')
    .on('click', () => {
        d3.selectAll('.letter')
            .remove();
        
        d3.select('#phrase')
            .text('');
        
        d3.select('#count')
            .text('');
    })

d3.select("form").on("submit", () => {
	d3.event.preventDefault();
	const input = d3.select("input");
	const text = input.property("value");

	let letters = d3.select("#letters")
		            .selectAll(".letter")
                    .data(getFrequencies(text), d => {
                        return d.character;
                    });

	letters
		.classed("new", false)
		.exit()
		.remove();

	letters
		.enter()
		.append("div")
		    .classed("letter", true)
		    .classed("new", true)
		.merge(letters)
            .style("width", "20px")
            .style("line-height", "20px")
            .style("margin-right", "5px")
            .style("height", d => {
                return d.count * 20 + "px";
            })
            .text(d => {
                return d.character;
            });

    d3.select("#phrase")
        .text("Analysis of: " + text);

    d3.select("#count")
        .text("(New characters: " + letters.enter().nodes().length + ")"
	);

	input.property("value", "");
});

getFrequencies = str => {
	const sorted = str.split("").sort();
	let data = [];
	for (i = 0; i < sorted.length; i++) {
		const last = data[data.length - 1];
		if (last && last.character === sorted[i]) last.count++;
		else data.push({ character: sorted[i], count: 1 });
	}
	return data;
};
