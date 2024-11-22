import React from "react";

export interface PropsComponent{
    horizontal: boolean;
    children: React.ReactNode;
    containerStyle: any;
    style: any;
    scrollViewStyle: any;
    pagingEnabled: boolean;
    showsHorizontalScrollIndicator: boolean;
    showsVerticalScrollIndicator: boolean;
    bounces: boolean;
    scrollsToTop: boolean;
    removeClippedSubviews: boolean;
    automaticallyAdjustContentInsets: boolean;
    showsPagination: boolean;
    showsButtons: boolean;
    disableNextButton: boolean;
    disablePrevButton: boolean;
    loadMinimal: boolean;
    loadMinimalSize: number;
    loadMinimalLoader: any;
    loop: boolean;
    autoplay: boolean;
    autoplayTimeout: number;
    autoplayDirection: boolean;
    index: number;
    renderPagination: any;
    dotStyle:any;
    activeDotStyle:any;
    activeDot: any;
    dot: any;
    dotColor: string;
    activeDotColor: string;
    paginationStyle: any;
    nextButton : any;
    prevButton: any;
    onTouchEnd : any;
    buttonWrapperStyle: any;
    onIndexChanged: (val: any) => void;
    onScrollBeginDrag : any
    onMomentumScrollEnd: any
}