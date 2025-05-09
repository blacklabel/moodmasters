const H = Highcharts,
pick = H.pick,
defined = H.defined,
ItemSeries_extend = H.extend;

H.seriesTypes.item.prototype.drawPoints = function () {
        const series = this, options = this.options, renderer = series.chart.renderer,
        seriesMarkerOptions = options.marker, borderWidth = this.borderWidth,
        crisp = borderWidth % 2 ? 0.5 : 1, rows = this.getRows(),
        cols = Math.ceil(this.total / rows),
        cellWidth = this.chart.plotWidth * (options.size && H.isNumber(options.size[0]) ? options.size[0] : 1) / cols,
        cellHeight = this.chart.plotHeight * (options.size && H.isNumber(options.size[1]) ? options.size[1] : 1) / rows,
        itemSize = this.itemSize || Math.min(cellWidth, cellHeight);
        let i = 0;
        /* @todo: remove if not needed
        this.slots.forEach(slot => {
            this.chart.renderer.circle(slot.x, slot.y, 6)
                .attr({
                    fill: 'silver'
                })
                .add(this.group);
        });
        //*/
        for (const point of series.points) {
            const pointMarkerOptions = point.marker || {}, symbol = (pointMarkerOptions.symbol ||
                seriesMarkerOptions.symbol), r = pick(pointMarkerOptions.radius, seriesMarkerOptions.radius), size = defined(r) ? 2 * r : itemSize, padding = size * options.itemPadding;
            let attr, graphics, pointAttr, x, y, width, height;
            point.graphics = graphics = point.graphics || [];
            if (!series.chart.styledMode) {
                pointAttr = series.pointAttribs(point, point.selected && 'select');
            }
            if (!point.isNull && point.visible) {
                if (!point.graphic) {
                    point.graphic = renderer.g('point')
                        .add(series.group);
                }
                for (let val = 0; val < (point.y || 0); ++val) {
                    // Semi-circle
                    if (series.center && series.slots) {
                        // Fill up the slots from left to right
                        const slot = series.slots.shift();
                        x = slot.x - itemSize / 2;
                        y = slot.y - itemSize / 2;
                    }
                    else if (options.layout === 'horizontal') {
                        x = cellWidth * (i % cols);
                        y = cellHeight * Math.floor(i / cols);
                    }
                    else {
                        x = (options.left || 0) * this.chart.plotWidth + cellWidth * Math.floor(i / rows);
                        y = (options.top || 0) * this.chart.plotHeight + cellHeight * (i % rows);
                    }
                    x += padding;
                    y += padding;
                    width = Math.round(size - 2 * padding);
                    height = width;
                    if (series.options.crisp) {
                        x = Math.round(x) - crisp;
                        y = Math.round(y) + crisp;
                    }
                    attr = {
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    };
                    if (typeof r !== 'undefined') {
                        attr.r = r;
                    }
                    // Circles attributes update (#17257)
                    if (pointAttr) {
                        ItemSeries_extend(attr, pointAttr);
                    }
                    let graphic = graphics[val];
                    if (graphic) {
                        graphic.animate(attr);
                    }
                    else {
                        graphic = renderer
                            .symbol(symbol, void 0, void 0, void 0, void 0, {
                            backgroundSize: 'within'
                        })
                            .attr(attr)
                            .add(point.graphic);
                    }
                    graphic.isActive = true;
                    graphics[val] = graphic;
                    ++i;
                }
            }
            for (let j = 0; j < graphics.length; j++) {
                const graphic = graphics[j];
                if (!graphic) {
                    return;
                }
                if (!graphic.isActive) {
                    graphic.destroy();
                    graphics.splice(j, 1);
                    j--; // Need to subtract 1 after splice, #19053
                }
                else {
                    graphic.isActive = false;
                }
            }
        }
    }